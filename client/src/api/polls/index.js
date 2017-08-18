import axios from 'axios'

class PollApi {

  static fetchAllPolls() {
    return axios.get('/api/polls/all').then(res => {
      return res.data
    }).catch(err => {
      console.log(err)
    })
  }

  static createPoll(poll) {
    return axios.post('/api/polls/new', poll)
  }

  static fetchOnePoll(id) {
    return axios.get(`/api/polls/id/${id}`)
  }

}

export default PollApi
