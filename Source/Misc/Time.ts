
export { toAgoString }

import moment from 'Moment'


function timeSince ( time : Date ){
    return moment.duration(moment().diff(time))
}


function toAgoString (
    time : Date
){

    const duration = timeSince(time)

    const years = duration.years()

    if( years > 0 )
        return `${ years }y`

    const months = duration.months()

    if( months > 0 )
        return `${ months }M`

    const days = duration.days()

    if( days > 0 )
        return `${ days }d`

    const hours = duration.hours()

    if( hours > 0 )
        return `${ hours }h`

    const minutes = duration.minutes()

    if( minutes > 0 )
        return `${minutes}m`

    return `Now`
}
