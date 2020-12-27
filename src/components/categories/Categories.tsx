import React from 'react'
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../../actions/categories';
import { useEffect } from 'react';

export const Categories = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])

    return (
        <div>
            <h2>Aqui las categorias</h2>
        </div>
    )
}
