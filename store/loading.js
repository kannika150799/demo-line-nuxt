export const state = () => ({
    loading: false
})

export const mutations = {
    startLoading (state) {
        console.log('start')
        state.loading = true
    },
    stopLoading (state) {
        console.log('stop');
        state.loading = false
    }
}