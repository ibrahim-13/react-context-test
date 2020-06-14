import React from 'react';

const ViewStyle: React.CSSProperties = { textAlign: 'center', padding: '50px' };

// Actions for reducer
enum EnumReducerActions {
  IncrementOne = "incrementOne",
  IncrementTwo = "incrementTwo",
};

// Context Value
const IncrementContextDefault = {
  incrementOne: 0,
  incrementTwo: 0,
  dispatch: (action: EnumReducerActions) => { }
};

// State for the reducer
type TypeReducerState = Omit<typeof IncrementContextDefault, 'dispatch'>;

// Context
const IncrementContext = React.createContext(IncrementContextDefault);

function IncrementOneView() {
  const context = React.useContext(IncrementContext);
  console.count('IncrementOneView');
  return (
    <div>
      Increment One : {context.incrementOne}
    </div>
  );
}

function IncrementTwoView() {
  const context = React.useContext(IncrementContext);
  console.count("IncrementTwoView");
  return (
    <div>
      Increment Two : {context.incrementTwo}
    </div>
  );
}

function IncrementOneButton() {
  const context = React.useContext(IncrementContext);
  console.count('IncrementOneButton');
  return (
    <div>
      <button
        onClick={() => context.dispatch(EnumReducerActions.IncrementOne)}
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
        onClick={() => context.dispatch(EnumReducerActions.IncrementTwo)}
      >
        Increment Two
      </button>
    </div>
  )
}

function App() {
  const [state, dispatch] = React.useReducer<React.Reducer<TypeReducerState, EnumReducerActions>>(
    (state, action) => {
      switch (action) {
        case EnumReducerActions.IncrementOne: return { ...state, incrementOne: state.incrementOne + 1 };
        case EnumReducerActions.IncrementTwo: return { ...state, incrementTwo: state.incrementTwo + 1 };
        default: return state;
      }
    },
    IncrementContextDefault,
  )
  console.count('App');
  return (
    <IncrementContext.Provider value={{ ...state, dispatch }}>
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
