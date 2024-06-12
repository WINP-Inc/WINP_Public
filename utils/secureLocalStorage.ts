import SecureLS from 'secure-ls';

export default function SecureLocalStorage() {
    var ls = new SecureLS({ encodingType: 'aes' });
    return ls;
}