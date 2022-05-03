export default function get_object_first_attribute(data) {
  if (typeof data === 'string') {
    return data
  } else {
    for (var key in data) return data[key][0]
  }
}
