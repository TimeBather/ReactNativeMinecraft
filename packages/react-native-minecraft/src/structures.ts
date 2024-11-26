export class MapSet<K, V> {
    private map: Map<K, Set<V>>;

    constructor() {
        this.map = new Map();
    }

    add(key: K, value: V): void {
        if (!this.map.has(key)) {
            this.map.set(key, new Set());
        }
        this.map.get(key)!.add(value);
    }

    remove(key: K, value: V): boolean {
        const set = this.map.get(key);
        if (!set) return false;
        
        const result = set.delete(value);
        if (set.size === 0) {
            this.map.delete(key);
        }
        return result;
    }

    get(key: K): Set<V> {
        return this.map.get(key) || new Set();
    }

    has(key: K, value: V): boolean {
        const set = this.map.get(key);
        if (!set) return false;
        
        return set.has(value);
    }
    forEach(callback: (value: V, key: K) => void): void {
        this.map.forEach((set, key) => {
            set.forEach(value => callback(value, key));
        });
    }

    notify(key:K, callback:(value:V)=>void) {
        if(!this.map.has(key))
            return;
        this.map.get(key)!.forEach((t)=>callback(t));
    }
}