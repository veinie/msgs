const { tokenExtractor } = require('../../../common/util/middleware')

module.exports = async ({ req }) => {
  try {
    tokenExtractor(req, null, (err) => {
      if (err) { console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB') }
    })
    return {
      req,
    }
  } catch (error) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n', error)
  }

};

// module.exports = async ({ req }) => {
//   tokenExtractor(req, null, () => {})
//   return {
//     req,
//   }
// };

// module.exports = async ({ req }) => {
//   try {
//     await new Promise((resolve, reject) => {
//       tokenExtractor(req, null, (err) => {
//         if (err) {
//           reject(err); // Reject the promise with the error
//         } else {
//           resolve(); // Resolve the promise
//         }
//       });
//     });

//     return {
//       req,
//     };
//   } catch (error) {
//     // Handle the error here
//     console.error('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:', error);
//     throw new Error('An unexpected error occurred');
//   }
// };
