import { Col, Space, Tag } from "antd";

const TYPE_COLORS = {
  "grass": "#87d068",
  "poison": "#800080",
  "fire": "#FF5733",
  "water": "#00FFFF",
  "electric": "#FFC000"
}

export default function PokemonDetails({ pokemonDetails }) {
  return (
    <Col span={24}>
      <Space>
        {pokemonDetails?.types && pokemonDetails.types.map((type) => {
          return <Tag color={TYPE_COLORS[type?.type?.name]}>{type?.type?.name}</Tag>
        })}
      </Space>
    </Col>
  )
}
