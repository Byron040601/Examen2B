import {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import api from "../api";
import {Button, Grid} from "@material-ui/core";

const Random = () => {

    const [advices, setAdvices] = useState(null);
    const [advicesFav, setAdvicesFav] = useState([]);

    try {
        useEffect(() => {
            firstAdvice();
        }, []);
    } catch (e) {
        alert("Algo ocurrió")
    }

    try {
        useEffect(() => {
        }, [advicesFav])
    } catch (e) {
        alert("Algo ocurrió")
    }

    async function firstAdvice() {
        const response = await api.get("/advice");
        setAdvices(response.data)
    }

    const nextAdvice = () => {
        const randomAd = async () => {
            const responseRand = await api.get("/advice");
            setAdvices(responseRand.data);
        }
        randomAd();
    }

    const favAdvice = () => {
        setAdvicesFav((prevState) => {
                const advice = advices.slip;
                // const listFav = advicesFav.filter(function (advFav) {
                //     return advFav.id !== advice.id
                // })
                // if (listFav !== advicesFav) {
                return [...prevState, advice];
                // } else {
                //     alert("Este consejo ya esta en tu lista de favoritos.")
                // }
            }
        )
    }

    const deleteFavAdv = (id) => {
        console.log('eliminacion ', id)
        const list = advicesFav.filter(function (adv) {
            return adv.id !== id;
        });
        setAdvicesFav(list);
    }

    if (!advices) {
        return "Cargando..."
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container spacing={1}>
                <Grid md={5}>
                    <h1>Consejo del día</h1>
                    <p>{advices.slip.advice}</p>
                    <div>
                        <Button variant={"contained"} color={"primary"} type={"submit"}
                                onClick={favAdvice}>Marcar como favorito</Button>
                        {"\t"}
                        <Button variant={"contained"} color={"primary"} type={"submit"}
                                onClick={nextAdvice}> Siguiente consejo </Button>
                    </div>
                </Grid>
                <Grid md={7}>
                    <h1 >Consejos Favoritos</h1>
                    {advicesFav.map((fav) => (
                        <Grid container spacing={1} key={fav.id}>
                            <Grid md={7} >
                                {fav.advice}
                            </Grid>
                            <Grid md={5} >
                                <Button variant={"contained"} color={"primary"} type={"submit"}
                                        onClick={() => deleteFavAdv(fav.id)}>Quitar de la lista </Button>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid >
                <h1>Buscador de Consejos</h1>
            </Grid>
        </Container>
    )

}

export default Random;