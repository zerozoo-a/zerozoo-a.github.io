export default {
  data() {
    return { count: 0 };
  },
  template: `
  <div>
  <button @click="count++">count up</button>
    <div>
        {{count}}
    </div>
  <button @click="count--">count down</button>
  </div>
  `,
};
