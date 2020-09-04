

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloWorld from "./HelloWorld";
import HelloUser from "./HelloUser";
import { useState, useEffect, useCallback, useRef } from 'react';

declare const firebase: typeof import('firebase');

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<null | object>(null);
    const provider = new firebase.auth.TwitterAuthProvider();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            if(user){
                setCurrentUser(user);
            }else{
                firebase.auth().signInWithRedirect(provider);
            }
        });
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // TODO: あとでDBに保存する
                var credential = result.credential;
            }
            setCurrentUser(result.user);
        }).catch(function(error) {
            console.log(error);
        });
    }, []);
    return currentUser;
}

const MainView: React.FC = () => {
    const currentUser = useCurrentUser();
    const style = {
        margin: '0px',
        padding: '0px',
        width: '100%'
    }
    return <div style={style}>
        <HelloUser user={firebase.auth().currentUser} />
    </div>
}


// Firebase関係
document.addEventListener('DOMContentLoaded', function() {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  //
  // firebase.auth().onAuthStateChanged(user => { });
  // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  //
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
        let app = firebase.app();
        let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        // MainView を app という id の Elementの子として描画する
        ReactDOM.render(<MainView />, document.getElementById("app"));
    } catch (e) {
        console.error(e);
    }

});