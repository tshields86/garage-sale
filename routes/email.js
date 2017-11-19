const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/send', function(req, res){
  const email = req.body
  console.log("email", email);

  if (email.fromemail == null) {
    res.json({
      confirmation: 'fail',
      messade: 'Missing fromemail parameter'
    })
    return
  }

  if (email.fromname == null) {
    res.json({
      confirmation: 'fail',
      messade: 'Missing fromname parameter'
    })
    return
  }

  if (email.recipient == null) {
    res.json({
      confirmation: 'fail',
      messade: 'Missing recipient parameter'
    })
    return
  }

  if (email.content == null) {
    res.json({
      confirmation: 'fail',
      messade: 'Missing content parameter'
    })
    return
  }

  if (email.subject == null) {
    res.json({
      confirmation: 'fail',
      messade: 'Missing subject parameter'
    })
    return
  }

  turbo.sendEmail(email)
    .then(data => {
      res.json({
        confirmation: 'success',
        data: 'Email sent'
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })
})

// router.get('/auth', function(req, res){
//   res.render('auth', null)
// })


module.exports = router
