const groupClassesByLevels = classes => {
    const out = []
    for(let j=0; j < classes.length; j++){
        if(!out[out.length-1] || classes[j] !== out[out.length-1].id){
            out.push({id: classes[j], count: 1})
        }else{
            out[out.length-1].count += 1
        }
    }
    return out
}


export default groupClassesByLevels;