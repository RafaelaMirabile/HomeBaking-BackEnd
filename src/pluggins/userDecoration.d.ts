import { Plugin } from '@hapi/hapi';

declare module '@hapi/hapi' {
    interface ServerApplicationState {
        user: any; // Modify this type to match your user object type
    }

    interface Request {
        user: any; // Modify this type to match your user object type
    }
}

declare const userDecoration: Plugin<{}>;

export default userDecoration;
