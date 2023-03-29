import { Row, Col, Statistic } from "antd";

export default function PokemonStatistics({ pokemonDetails }) {
  return (
    <Row gutter={100}>
      <Col span={12}>
        <Statistic title="Weight" value={pokemonDetails?.weight} />
      </Col>
      <Col span={12}>
        <Statistic title="Height" value={pokemonDetails?.height} />
      </Col>
    </Row>
  )
}
