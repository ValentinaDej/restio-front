## Redux & Toolkit are already installed and connected to the app.

### How to use Redux Toolkit:

1. Create a slice (complete piece of the data, you want to store) in this folder (e.g., "cartSlice.js")
2. Initialize your data in the initialState of the slice and add reducer functions for the data operations, as shown in this example:

```
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
name: 'counter',
initialState: {
value: 0
},
reducers: {
incremented: state => {
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
state.value += 1
},
decremented: state => {
state.value -= 1
}
}
})

export const { incremented, decremented } = counterSlice.actions;
export default counterSlice.reducer;

```

3. Import the reducers you created for your slice in the index.js file and connect them to the store, as it's already done for the cart reducer:

```
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
reducer: {
cart: cartReducer,
},
});

export default store;
```

4. If you have any questions, refer to the wonderful documentation here - [Redux Docs](https://redux-toolkit.js.org/introduction/getting-started).
   Additionally, you can reach out to our even more wonderful team of developers for further assistance in our group.
