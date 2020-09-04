import * as React from 'react';

type HelloUserProps = {
  user: any;
}
const HelloUser: React.FC<HelloUserProps> = (props) => {
    return (
      <div>
        <h1>Hello, {
            props.user
            ? props.user.displayName
            : 'please login by twitter...'
          }
        </h1>
        <img src={props.user?.photoURL} />
      </div>
    );
}
export default HelloUser;