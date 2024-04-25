      <View style={styles.productCardTop}>
        <View style={styles.colorContainer}>
          <Text style={[theme.fontFamily, styles.text]}>اختر اللون</Text>

          <View style={styles.colors}>
            {proproduct.colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorCircle, { backgroundColor: color }]}
                onPress={() => console.log(color)}
              ></TouchableOpacity>
            ))}

            <View style={styles.addColorButton}>
              <Ionicons
                onPress={() => {
                  console.log("Add a new color");
                }}
                style={{ fontSize: 18 }}
                name="add-outline"
              ></Ionicons>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/1000.jpg")}
            resizeMode="contain"
          />
          <View style={styles.addImageButton}>
            <Ionicons
              style={{ fontSize: 18, color: "#fff" }}
              name="add-outline"
            ></Ionicons>
          </View>
        </View>
        <View></View>
      </View>

      <View style={styles.productCardBottom}>
        <View>
          <Text style={[theme.fontFamily, styles.text]}>
            حدد الاحجام المتاحة من المنتج
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <AddDropDown />
          {
            product.sizes.map((option, index) => (
              <>
              {console.log()}
              <DropdownComponent product={product} key={index} />
              </>
            ))
          }
          
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.cardFooterRight}>
            <Text style={[theme.fontFamily, styles.text]}>سعر اللون الاول</Text>

            <View style={styles.price}>
              <TextInput placeholder="Price" />
              <CustomDropdown
                style={styles.dropDown}
                options={product.price.currency}
              />
            </View>
          </View>

          <View style={styles.cardFooterLeft}>
            <Text style={[theme.fontFamily, styles.text]}>الكمية</Text>
            <TextInput style={styles.quantity} placeholder="Quantity" />
          </View>
        </View>

        <TouchableOpacity
          style={styles.discount}
          onPress={() => {
            console.log("Add discount ");
          }}
        >
          <Ionicons
            style={{
              fontSize: 18,
              color: theme.colors.orangy,
              paddingLeft: 10,
            }}
            name="add-circle-outline"
          ></Ionicons>
          <Text
            style={{
              fontSize: 18,
              color: theme.colors.orangy,
              fontFamily: theme.fontFamily.fontFamily,
            }}
          >
            إضافة خصم
          </Text>
        </TouchableOpacity>
      </View>