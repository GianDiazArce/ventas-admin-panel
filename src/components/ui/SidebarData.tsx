import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export interface ISideItem {
    title: string;
    path?: string ;
    icon: JSX.Element;
    iconClosed?: JSX.Element;
    iconOpened?: JSX.Element;
    subNav?: any;
}

export interface ISubNav{
    title: string;
    path: string;
    icon: JSX.Element;
}
export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        // iconClosed: <RiIcons.RiArrowDownSFill />,
        // iconOpened: <RiIcons.RiArrowUpSFill />,
        // subNav: [
        //     {
        //         title: ''
        //     }
        // ]
    },
    {
        title: 'Productos',
        // path: '/products',
        icon: <FaIcons.FaFolder />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Proveedores',
                path: '/products/providers',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Categorias',
                path: '/products/categories',
                icon: <IoIcons.IoIosPaper />
            },
        ]

    },
    {
        title: 'Ventas',
        // path: '/categories',
        icon: <FaIcons.FaFolder />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Proveedores',
                path: '/categories/providers',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Categorias',
                path: '/categories/categories',
                icon: <IoIcons.IoIosPaper />
            },
        ]

    },
    {
        title: 'Reportes',
        // path: '/reports',
        icon: <FaIcons.FaFolder />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'reports',
                path: '/reports/reports1',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'reports 2',
                path: '/reports/reports2',
                icon: <IoIcons.IoIosPaper />
            },
        ]

    },
    {
        title: 'Categorias',
        // path: '/reports',
        icon: <FaIcons.FaFolder />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Ver Categorias',
                path: '/categorias',
                icon: <IoIcons.IoIosPaper />
            }
        ]

    },
]