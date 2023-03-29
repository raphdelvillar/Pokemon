import { fetchPokemons, fetchOnePokemon } from "./api";
import { useEffect, useState } from "react";
import { Typography, Col, Row, Button } from "antd";

import PokemonImage from "./pokemon-image";
import PokemonDetails from "./pokemon-details";
import PokemonStatistics from "./pokemon-statistics";

const FRONT = "front_default";

export default function Pokemon() {
  const [offset, setOffset] = useState(0);
  const [maxRandom, setMaxRandom] = useState(30);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [pokemonOfficialArtWork, setPokemonOfficialArtWork] = useState("");

  useEffect(() => {
    async function retrievePokemonDetails() {
      let fetchPokemonsData = await fetchPokemons(offset, 1);
      let pokemonsList = fetchPokemonsData.data.results;

      setMaxRandom(fetchPokemonsData.data.count);

      let fetchPokemonData = await fetchOnePokemon(pokemonsList[0].name);
      let pokemon = fetchPokemonData.data;

      setPokemonDetails(pokemon)
      setPokemonSprite(pokemon?.sprites[FRONT]);
      setPokemonOfficialArtWork(pokemon?.sprites?.other["official-artwork"][FRONT]);
    }

    retrievePokemonDetails();
  }, [offset])

  return (
    <div>
      <Row>
        <PokemonImage pokemonOfficialArtWork={pokemonOfficialArtWork} pokemonSprite={pokemonSprite} pokemonDetails={pokemonDetails} />
        <br/><br/>
        <PokemonDetails pokemonDetails={pokemonDetails}/>
      </Row>
      <br />
      <PokemonStatistics pokemonDetails={pokemonDetails} />
      <br />
      <Row gutter={100}>
        <Col span={8}>
          <Button disabled={offset === 0} onClick={() => setOffset(offset - 1)} size="large">Previous</Button>
        </Col>
        <Col span={8}>
          <Button onClick={() => setOffset(Math.floor(Math.random() * maxRandom))} size="large">Random</Button>
        </Col>
        <Col span={8}>
          <Button onClick={() => setOffset(offset + 1)} type="primary" size="large">Next</Button>
        </Col>
      </Row>
    </div>
  )
}
