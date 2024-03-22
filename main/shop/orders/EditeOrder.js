import * as React from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

const EditOrder = ({ children, visible, hideModal }) => {
//   const [visible, setVisible] = React.useState(true);

  const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin:10 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default EditOrder;
