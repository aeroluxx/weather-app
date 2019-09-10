import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 8000,
    flex: 1,
    paddingTop: 30
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e'
  }
})

const url = 'https://www.metoffice.gov.uk/pub/data/weather/uk/climate/stationdata/bradforddata.txt'

export default class App extends React.Component {
  state = {
    text: '',
    result: []
  }

  async componentDidMount() {
    try {
      const response = await fetch(url)
      const text = await response.text()
      this.setState({ text })
      let fields
      const res = await text.split('\n').reduce((result, string) => {
        const words = string.split(/\s+/g)
        if (words.length === 8) {
          if (fields) {
            const obj = {}
            fields.forEach((field, index) => (obj[field] = words[index]))
            result.push(obj)
          } else {
            fields = [...words]
          }
        }
        return result
      }, [])
      //console.error(res)
      //this.setState({ result: res })
    } catch (e) {
      console.warn(e)
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.paragraph}>{this.state.text}</Text>
        </View>
      </ScrollView>
    )
  }
}
