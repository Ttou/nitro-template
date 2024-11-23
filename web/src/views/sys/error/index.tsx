import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorView',
  render() {
    return (
      <div class="error">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    )
  },
})
