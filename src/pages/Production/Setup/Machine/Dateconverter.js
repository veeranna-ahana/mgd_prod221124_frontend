export const formatDate = (dateeee) => {
    if(!dateeee || dateeee===null || dateeee==='') return ""
let date=new Date(dateeee)
    let month=date.getMonth()+1
    let year=date.getFullYear()
    let day=date.getDate()

    if(month<10){
        // console.log("nside mnth")
        month=`0${month}`
    }

    if(day<10){
        day=`0${day}`

    }
    // month=parseInt(month)
    // console.log(`${year}-${month}-${day}`)
     return `${year}-${month}-${day}`

}