import * as React from 'react';
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Enlaces from '@/components/enlaces';
import FormularioCronograma from '@/components/formularioCronograma';
import CardCronoAdmin from '@/components/cardCronoAdmin';
import { useState } from 'react';
import apiClient from '@/apiClient';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


export default function CronogramaAdmin() {
  const [schedules, setCronograma] = useState([]);




  useEffect(() => {
    // ir por los productos desde el backend
    refresh();
  }, []);

  const refresh = () => {
    apiClient.get('/schedules')
      .then(response => {
        setCronograma(response.data || []);
        if(renderCronograma){
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteCronograma = (id) => {
    Swal.fire({
      title: '¿Estás Seguro de eliminar?',
      text: "Los datos relacionados con la unidad se perderan permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient.delete(`/schedules?id=${id}`)
          .then(response => {
            console.log(response.data);
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: response.data.message,
            })
            refresh();
          })
          .catch(error => {
            console.log(error);
          })
      }
    })

  }
  const renderCronograma = () => {
    return schedules.map((crono) => (
      <Grid item xs={12} lg={4} xl={2} mt={4} key={crono.id}>
        <CardCronoAdmin
          crono={crono}
          onSave={refresh}
          onDelete={deleteCronograma}
        />
      </Grid>
    ))
  };

  return (
    <>
      <Head>
        <title>SIRTA</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
      </Head>
      <main>
        <Navbar className="menu" fixed="top">
          <Container>
            <Navbar.Brand id="unidadesTitle">
              Cronograma
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="formularioCrono">
          <FormularioCronograma
            recargar={refresh}
          />
        </Container>
        <Grid style={{ paddingLeft: "20px", paddingRight: "20px" }} container spacing={2} mt={0} mb={10}>
          {renderCronograma()}
        </Grid>
        <Enlaces></Enlaces>
      </main>

    </>
  )
}