const ifEmpty = field => {
    try {
        let results = true;
        if( 
            field === undefined || field === null || 
            (typeof field === "string" && field.trim().length === 0) || 
            (typeof field === "object" && Object.keys(field).length === 0)
        )
        results = false;      
        return results;  
    } catch(error){
        return error;
    }
};

module.exports = ifEmpty;