import axios from 'axios'

class PollApi {

  static fetchAllPolls() {
    return axios.get('/api/polls/all')
  }

}

export default PollApi
