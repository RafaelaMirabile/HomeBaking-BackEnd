 const userDecoration = {
    name: 'user',
    version: '1.0.0',
    register: (server, options) => {
      server.decorate('request', 'user', null);
    }
}

export default userDecoration;