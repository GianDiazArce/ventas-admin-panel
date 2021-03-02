export const translateStatusSale = ( status: string ) => {

    if(status === "pending"){
        return 'Pendiente'
    } else if (status === "success"){
        return 'Completado'
    } else if(status === "cancel" ) {
        return 'Cancelado'
    }
}