const { isValid } = require('date-fns')

const isDate = ( value ) => {
    if ( !value ) {
        return false;
    }

    const date = new Date( value );
    return isValid(date);

}

module.exports = {
    isDate
}