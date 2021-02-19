import React from 'react'
import { Button } from 'semantic-ui-react';


export const btnAddIcon = (name:string) => {
    return (
        <Button content={name} icon="add" labelPosition="left" />
    )
}
