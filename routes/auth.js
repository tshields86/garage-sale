const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/register', function(req, res){

  // res.json({
  //   confirmation: 'success',
  //   data: req.body
  // })
  
  turbo.createUser(req.body)
    .then(data => {
      req.vertexSession.user = {id: data.id}
      res.redirect('/')

      // res.json({
      //   confirmation: 'success',
      //   data: data
      // })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        data: err.message
      })
    })

})

router.get('/currentuser', function(req, res) {
  if (req.vertexSession == null) {
    res.json({
      confirmation: 'success',
      user: null
    })
    return
  }

  if (req.vertexSession.user == null) {
    res.json({
      confirmation: 'success',
      user: null
    })
    return
  }

  // user logged in
  // res.json({
  //   confirmation: 'success',
  //   user: req.vertexSession.user
  // })
  
  turbo.fetchOne('user', req.vertexSession.user.id)
    .then(data => {
      res.json({
        confirmation: 'success',
        user: data
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        user: err.message
      })
    })

})


module.exports = router
