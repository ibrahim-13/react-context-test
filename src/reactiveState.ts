type Callback = {
  id: string,
  cb: () => void,
};

class ReactiveVariable<T> {
  private value: T | undefined;
  private reactions: Callback[] = [];

  setValue(v: T): void {
    this.value = v;
    this.reactions.forEach(r => r.cb());
  }

  getValue(): T | undefined {
    return this.value;
  }

  addReaction(cb: Callback['cb']): string {
    const id: string = `${Math.random() * 1000}-${Math.random() * 1000}-${Math.random() * 1000}`;
    this.reactions.push({ id, cb });
    return id;
  }

  removeReaction(id: string): void {
    this.reactions = this.reactions.filter(r => r.id !== id);
  }
}

class ReactiveStateClass {
  inc1: ReactiveVariable<number> = new ReactiveVariable();
  inc2: ReactiveVariable<number> = new ReactiveVariable();

  increment1(): void {
    const currentValue = this.inc1.getValue() ?? 0; 
    this.inc1.setValue(currentValue + 1);
  }
  
  increment2(): void {
    const currentValue = this.inc2.getValue() ?? 0; 
    this.inc2.setValue(currentValue + 1);
  }
}

export const ReactiveState = new ReactiveStateClass();