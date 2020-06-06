const email = /^\S+@\S+\.\S+$/
const checkDate = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/
const checkTime = /^(\d{1,2})?([MmHh])/

module.exports = {
    email,
    checkDate,
    checkTime
};