
export const cleanMap = (obj) => {
    return Object.entries(obj).reduce((a,[k,v]) => (v === null ? a : {...a, [k]:v}), {})
};

export const stressedWord = ({letters='', stress=0}) =>  {
        let arr = letters.split('');
        let parts = [];
        if (arr.length > 0) {
          arr[0] = arr[0].toUpperCase();
          parts[0] = arr.slice(0, stress+1).join('');
          parts[1] = '\u0301';
          parts[2] = arr.slice(stress+1).join('');
        }
        return parts.join('')
}
