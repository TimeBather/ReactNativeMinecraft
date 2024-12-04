import {Channel, ChannelHandler, MenuEntry, MenuHandle} from "@kasugalib/menu";
import {CompoundTagWrapper, createCompoundTag} from "@kasugalib/nbt";

type StateUpdater<T> = (value: T) => void
type EmitHandler = (...args: any[]) => void
type GroupDefinition = Record<string, any>


let currentPath: string[] = []

let currentManager: MenuStateManager | null = null

export class MenuStateManager extends MenuEntry{
    private states: Record<string, any> = {}
    private emits: Record<string, EmitHandler> = {}
    private pendingUpdates: Record<string, any> = {}
    private updateTimer: any
    private readonly UPDATE_INTERVAL = 50 // 50ms
    private effects: Array<() => void> = []

    constructor(handle: MenuHandle) {
        super(handle)
        this.setupUpdateTimer()
    }

    private setupUpdateTimer() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer)
        }
        this.updateTimer = setInterval(() => {
            this.flushUpdates()
        }, this.UPDATE_INTERVAL)
    }

    private flushUpdates() {
        if (Object.keys(this.pendingUpdates).length === 0) return
        
        // 将扁平结构转换为树状结构
        const treeData = {}
        for (const path in this.pendingUpdates) {
            const parts = path.split('.')
            let current : any = treeData
            for (let i = 0; i < parts.length - 1; i++) {
                current[parts[i]] = current[parts[i]] || {}
                current = current[parts[i]]
            }
            current[parts[parts.length - 1]] = this.pendingUpdates[path]
        }

        const resp = createCompoundTag()
        resp.putString("channel$update", JSON.stringify(treeData))
        this.broadcast(resp)
        this.pendingUpdates = {}
    }

    registerState<T>(path: string, initialValue: T): [() => T, StateUpdater<T>] {
        this.states[path] = initialValue
        const getter = () => this.states[path]
        const updater = (value: T) => {
            this.states[path] = value
            this.pendingUpdates[path] = value
        }
        return [getter, updater]
    }

    registerEmit(path: string, handler: EmitHandler) {
        this.emits[path] = handler
        return handler
    }

    getStates() {
        return this.states
    }

    handleEmit(path: string, args: any[]) {
        const handler = this.emits[path]
        if (handler) {
            handler(...args)
        }
    }

    register(definition: () => void) {
        currentManager = this
        definition()
        currentManager = null
    }

    onMessage(message: CompoundTagWrapper, channel: Channel, channelHandler: ChannelHandler) {
        if (message.getString("channel$sync") === "init") {
            // 初始化同步时也转换为树状结构
            const treeData = {}
            for (const path in this.states) {
                const parts = path.split('.')
                let current : any = treeData
                for (let i = 0; i < parts.length - 1; i++) {
                    current[parts[i]] = current[parts[i]] || {}
                    current = current[parts[i]]
                }
                current[parts[parts.length - 1]] = this.states[path]
            }

            const resp = createCompoundTag()
            resp.putString("channel$update", JSON.stringify(treeData))
            channelHandler.sendMessage(resp)
            return
        }

        const emitChannel = message.getString("channel$emit")
        if (emitChannel) {
            const emitData = message.getString("channel$emitData")
            try {
                const args = JSON.parse(emitData)
                this.handleEmit(emitChannel, args)
            } catch (e) {
                console.error("Failed to parse emit data:", e)
            }
        }
    }

    onClose() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer)
            this.updateTimer = null
        }
        this.effects.forEach(cleanup => cleanup())
        this.effects = []
    }

    registerEffect(effect: () => (() => void)) {
        const cleanup = effect()
        if (typeof cleanup === 'function') {
            this.effects.push(cleanup)
        }
    }
}

function getCurrentPath(): string {
    return currentPath.join('.')
}

function withPath<T>(path: string, fn: () => T): T {
    currentPath.push(path)
    const result = fn()
    currentPath.pop()
    return result
}

export function defineState<T>(initialValue: T, name?: string): [() => T, StateUpdater<T>] {
    if (!currentManager) {
        throw new Error('defineState must be called within a menu definition')
    }
    const path = name ? `${getCurrentPath()}.${name}` : getCurrentPath()
    return currentManager!.registerState(path, initialValue)
}

export function defineEmit(handler: EmitHandler, name?: string): EmitHandler {
    if (!currentManager) {
        throw new Error('defineEmit must be called within a menu definition')
    }
    const path = name ? `${getCurrentPath()}.${name}` : getCurrentPath()
    return currentManager!.registerEmit(path, handler)
}

export function defineGroup<T extends GroupDefinition>(name: string, setup: () => T) : T {
    if (!currentManager) {
        throw new Error('defineGroup must be called within a menu definition')
    }
    return withPath(name, setup)
}

export function defineEffect(effect: () => (() => void)) {
    if (!currentManager) {
        throw new Error('defineEffect must be called within a menu definition')
    }
    currentManager.registerEffect(effect)
}