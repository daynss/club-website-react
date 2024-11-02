export const empty = data => !data;

export const minLength = data => data.length < 2;

export const emailFormat = email => !(/^[a-zA-Z0-9+._%\-+]{1,256}@[a-zA-Z0-9][a-zA-Z0-9-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})$/.test(email))
