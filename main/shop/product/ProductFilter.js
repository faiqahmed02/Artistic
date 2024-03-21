import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";

function ProductFilter({
  showPick,
  hideModal,
  containerStyle,
  value,
  selectedData,
  data,
  setData
}) {
  return (
    <Portal>
      <Modal
        visible={showPick}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
        style={{ margin: 10 }}
      >
        <Picker
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => {
            selectedData(itemValue, itemIndex);
            setData([]);
          }}
        >
          {data.map((d) => {
            return <Picker.Item key={d} label={d.name} value={d.name} />;
          })}
        </Picker>
      </Modal>
    </Portal>
  );
}

export default ProductFilter;
