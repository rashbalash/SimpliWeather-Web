const currentLocalStorageVersion = 1;

export const saveStateToLocalStorage = (state) => {
    try {
        const stateToSave = {
            ...state,
            version: currentLocalStorageVersion,
        };

        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem('simpliweatherState', serializedState);
    } catch (error) {
        console.error('Error saving state to localStorage', error);
    }
};
  
export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('simpliweatherState');
        if (serializedState === null) return undefined;

        // TODO: Add Migration Method upon release
        // if (parsedState.version !== currentVersion) {
        //     migrateLocalStorage(parsedState.version, currentVersion);
        // }

        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from localStorage', error);
        return undefined; // Return undefined for Redux default
    }
};
