import React from 'react';
import { ReactiveState } from './reactiveState';

const ViewStyle: React.CSSProperties = { textAlign: 'center', padding: '50px' };

function useInc1(): number | undefined {
  const [value, setValue] = React.useState<number>();
  const context = React.useContext(IncrementContext);
  React.useEffect(() => {
    const id = context.inc1.addReaction(() => setValue(context.inc1.getValue()));
    return () => context.inc1.removeReaction(id);
  });
  return value;
}

function useInc2(): number | undefined {
  const [value, setValue] = React.useState<number>();
  const context = React.useContext(IncrementContext);
  React.useEffect(() => {
    const id = context.inc2.addReaction(() => setValue(context.inc2.getValue()));
    return () => context.inc2.removeReaction(id);
  });
  return value;
}

// Context
const IncrementContext = React.createContext(ReactiveState);

function IncrementOneView() {
  const inc1 = useInc1();
  console.count('IncrementOneView');
  return (
    <div>
      Increment One : {inc1}
    </div>
  );
}

function IncrementTwoView() {
  const inc2 = useInc2();
  console.count("IncrementTwoView");
  return (
    <div>
      Increment Two : {inc2}
    </div>
  );
}

function IncrementOneButton() {
  const context = React.useContext(IncrementContext);
  console.count('IncrementOneButton');
  return (
    <div>
      <button
        onClick={() => context.increment1()}
      >
        Increment One
      </button>
    </div>
  )
}

function IncrementTwoButton() {
  const context = React.useContext(IncrementContext);
  console.count('IncrementTwoButton');
  return (
    <div>
      <button
        onClick={() => context.increment2()}
      >
        Increment Two
      </button>
    </div>
  )
}

function App() {
  console.count('App');
  return (
    <IncrementContext.Provider value={ReactiveState}>
      <div style={ViewStyle}>
        <IncrementOneView />
        <IncrementTwoView />
        <br />
        <IncrementOneButton />
        <IncrementTwoButton />
      </div>
    </IncrementContext.Provider>
  );
}

export default App;
