import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';

// const items = [
//   { name: 'Cars'},
//   { name: 'Vans'},
//   { name: 'SUVs',},
//   { name: 'Motorbikes'},
//   { name: 'Trucks',},
// ];

export default function Filter({items, setSelectedItems, selectedItems, selectText}) {
  // const [selectedItems, setSelectedItems] = useState([]);
  console.log('Selected:', selectedItems);

  return (
    <View style={styles.container}>
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={Icon}
          uniqueKey="name"
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
          selectText={selectText}
          animateDropDowns
          showDropDowns
          modalAnimationType="slide"
          modalWithTouchable={true}
          // selectToggle={"#fff"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    // padding: 24,
    borderColor: "none", // if you need
    //   borderWidth:1,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1,
    marginBottom: 10,
    backgroundColor: "white",
    width:"100%",
  },
});