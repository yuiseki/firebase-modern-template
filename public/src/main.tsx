

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloWorld from "./HelloWorld";
import HelloUser from "./HelloUser";
import { useState, useEffect, useCallback, useRef } from 'react';

declare const firebase: typeof import('firebase');
//declare const firestore: typeof import('firebase/firestore');

//import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<null | object>(firebase.auth().currentUser);
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
            setCurrentUser(result.user);
            if (result.credential) {
                // DBに保存する
                var accessToken = result.credential.accessToken;
                var secret = result.credential.secret;
                var db = firebase.firestore()
                db.collection("TwitterUsers").doc(result.user.uid).set({
                    accessToken: accessToken,
                    secret: secret
                })
                /*
                firebase.database().ref('/TwitterUsers/'+result.user.uid).set({
                    accessToken: accessToken,
                    secret: secret
                })
                */
            }
        }).catch(function(error) {
            console.log(error);
        });
    }, []);
    return currentUser;
}

const LogoutButton: React.FC = () => {
    const onClick = useCallback(()=>{
        firebase.auth().signOut();
        location.reload();
    }, []);
    return <div>
        <input type="button" value="logout" onClick={onClick} />
    </div>
}

const MainView: React.FC = () => {
    const currentUser = useCurrentUser();
    console.log(currentUser);
    const style = {
        margin: '10px',
        padding: '10px',
        width: '100%'
    }
    return <div style={style}>
        <HelloUser user={currentUser} />
        <LogoutButton />
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