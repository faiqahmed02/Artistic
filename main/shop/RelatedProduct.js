import React from "react";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function RelatedProduct() {
  return (
      <ScrollView horizontal>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.relatedProduct}
            source={require("../../assets/related_product.png")}
          />
        </TouchableOpacity>
      </ScrollView>
  );
}

export default RelatedProduct;

const styles = StyleSheet.create({
  relatedProduct: {
    margin: 3,
    width:79,
    height:70
  },
});
