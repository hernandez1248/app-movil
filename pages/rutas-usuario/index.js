import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CardRutasUsuario from '@/components/cardRutasUser';
import React, { useState } from 'react';
import apiClient from '@/apiClient';
import Form from 'react-bootstrap/Form';
import { InputBase, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,EffectCoverflow,Pagination, Navigation } from 'swiper';


export default function RutasUsuario() {
  const [rutas, setRutas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [favoritosSelected, setFavoritosSelected] = useState([]);

  const [search, setSearch] = useState('');//capturar formulario de búsqueda

  React.useEffect(() => {
    apiClient.get('/schedules')
      .then(response => {
        setRutas(response.data || [])
      })
      .catch(error => {
        console.log(error);
      });

    apiClient.get('/favoritos')
      .then(response => {
        setFavoritos(response.data || [])
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  /*React.useEffect(() => {
     apiClient.get(`/rutas?favoritoId=${favoritosSelected || null}`)
       .then(response => {
         setRutas(response.data || [])
       })
       .catch(error => {
         console.log(error);
       });
   }, [favoritosSelected]);*/

  const onSelectFavorito = (e) => {
    setFavoritosSelected(e.target.value);
  }

  const onSearch = (e) => {
    setSearch(e.target.value);
    filter(e.target.value);

  }

  const filter = (caracter) => {
    var searchItem = rutas.filter((element) => {
      if (element.origen.toString().toLowerCase().includes(caracter.toLowerCase())
      ) {
        return element;
      }

    });
    setRutas(searchItem);
    setFavoritos(searchItem);

  }

  const renderRutas = () => {
    return (
      <Swiper
        style={{padding:'100px'}}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        //slidesPerView={1}
        autoplay={{delay: 10000, disableOnInteraction: false}}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows:true
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[Autoplay,EffectCoverflow, Pagination, Navigation]}
        className="myswiper"
      >
        {rutas.map((ruta, index) => (
          <SwiperSlide key={ruta.id} >
            <CardRutasUsuario
              index={index}
              ruta={ruta}
            />
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    );
  }

  return (
    <>
      <Head>
        <title>SIRTA</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <main>
        <Navbar className="menu" fixed="top">
          <Container>
            <Navbar.Brand id="unidadesTitle">
              Rutas
            </Navbar.Brand>
            <Nav className="d-flex justify-content-end">
            </Nav>
          </Container>
        </Navbar>

        <Container className="formularioCrono">
          <div className="cardCronogramaInfo">

            <Paper
              component="form"
              sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', width: 400, margin: 1.5 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar"
                inputProps={{ 'aria-label': 'search' }}
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={onSearch}
              />
            </Paper>

          </div>

        </Container>

        <Form.Select
          id="category-id"
          label="Categoría"
          value={favoritosSelected}
          onChange={onSelectFavorito}>
          <option>Selecionar</option>
          {favoritos.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </Form.Select>

        <Container>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {renderRutas()}
          </Grid>
        </Container>

        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        ></script>
        <script type="module" src="/src/main.jsx"></script>
      </main>
    </>
  )
}