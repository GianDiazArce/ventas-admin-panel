import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {
    // Container,
    Grid,
    Icon,
    Label,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'
import './sidebar.css'
import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { startLogout } from '../../actions/auth';

const Nav = styled.div`
    background: #15171c;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;


export const SemanticSideBar = ({children}: any) => {

   const [visible, setVisible] = useState(false)
   const { name } = useSelector((state: RootStateOrAny) => state.auth)
   const dispatch = useDispatch();

   const showSidebar = (e:any) => {
        // if (!e.target.classList.contains("NoClose")) {
            setVisible(false);
        // }
   };

   const handleLogout = () => {
       dispatch( startLogout() );
   }


    return (
        <Grid columns={1}  >
            <Grid.Column  className="columnMenu1" > 
                <Nav>
                    <NavIcon to='#' >
                        {
                            visible ? (<AiIcons.AiOutlineClose /* className="NoClose" onClick={ () => {setVisible(false)} }*/ />) : (<FaIcons.FaBars className="NoClose" onClick={ () => {setVisible(true)} } />)
                        }
                    </NavIcon>
                    {
                        name && (
                            <div  style={{marginLeft: '40px'}}>
                                <span style={{color:'white'}} >
                                    <Label color='red' horizontal>
                                        {name === 'gianadmin' ? 'ADMIN' : 'USER'}
                                    </Label>
                                    {name}
                                </span>
                            </div>
                        )
                    }
                    <div className="btnLogout">
                        <Button onClick={handleLogout} inverted>Salir</Button>
                    </div>
                </Nav>
            </Grid.Column>
            <Grid.Column  className="columnContainer1">
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        // animation='overlay'
                        animation='uncover'
                        icon='labeled'
                        inverted
                        onHide={showSidebar}
                        vertical
                        visible={visible}
                        className="menu"
                        width='thin'
                    >
                        <Menu.Item as={ Link } to="/home">
                            <Icon name='home' />
                            Inicio
                        </Menu.Item>
                        <Menu.Item as={ Link } to="/categorias">
                            <Icon name='tags' />
                            Categorias
                        </Menu.Item>
                        <Menu.Item as={ Link } to="/productos">
                            <Icon name='clipboard' />
                            Productos
                        </Menu.Item>
                        <Menu.Item as={ Link } to="/suppliers">
                            {/* <Icon name='user' /> */}
                            <Icon>
                                <FaIcons.FaUserTie />
                            </Icon>
                            Proveedores
                        </Menu.Item>
                        <Menu.Item as={ Link } to="/sales" >
                            <Icon name="archive" />
                            Ventas
                        </Menu.Item>
                    </Sidebar>
                <Sidebar.Pusher  
                    dimmed={visible} 
                >
                        {/* <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            <Image src='/images/wireframe/paragraph.png' />
                        </Segment> */}
                        {/* <Container> */}
                            {children}
                        {/* </Container> */}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>
        </Grid>
  )
}


