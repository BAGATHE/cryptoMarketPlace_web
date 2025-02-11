import React from 'react';
import { Modal, Button, Descriptions, Image } from 'antd';

const ModalInfoCrypto = ({ record, visible, onClose }) => {
  return (
    <Modal
      title={`Détails : ${record?.name || "Crypto"}`}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Fermer
        </Button>,
      ]}
    >
      <Descriptions bordered column={1}>
        {/* Image de la crypto */}
        <Descriptions.Item label="Image">
          <Image
            src={record.image}
            alt={record.name}
            width={64}
            height={64}
            style={{ objectFit: 'contain' }}
          />
        </Descriptions.Item>
        
        {/* Informations principales */}
        <Descriptions.Item label="Symbole">{record.symbol}</Descriptions.Item>
        <Descriptions.Item label="Prix actuel (USD)">
          ${record.current_price.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Classement sur le marché">
          #{record.market_cap_rank}
        </Descriptions.Item>
        <Descriptions.Item label="Capitalisation boursière">
          ${record.market_cap.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Volume total (24h)">
          ${record.total_volume.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Prix le plus élevé (24h)">
          ${record.high_24h.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Prix le plus bas (24h)">
          ${record.low_24h.toLocaleString()}
        </Descriptions.Item>

        {/* Informations supplémentaires */}
        <Descriptions.Item label="Variation du prix (24h)">
          {record.price_change_24h.toFixed(2)} USD (
          {record.price_change_percentage_24h.toFixed(2)}%)
        </Descriptions.Item>
        <Descriptions.Item label="Offre en circulation">
          {record.circulating_supply.toLocaleString()} unités
        </Descriptions.Item>
        <Descriptions.Item label="Offre maximale">
          {record.max_supply?.toLocaleString() || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Valorisation diluée">
          ${record.fully_diluted_valuation?.toLocaleString() || "N/A"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ModalInfoCrypto;
