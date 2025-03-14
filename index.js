// Import the solution function if this is in a separate file
// const solution = require('./solution');

// Test utility function
function runTest(testNumber, message, K, expected) {
    const result = solution(message, K);
    const passed = result === expected;
    console.log(`Test ${testNumber}: ${passed ? 'PASSED' : 'FAILED'}`);
    if (!passed) {
      console.log(`  Message: "${message}"`);
      console.log(`  K: ${K}`);
      console.log(`  Expected: "${expected}"`);
      console.log(`  Got: "${result}"`);
      console.log(`  Expected length: ${expected.length}, Got length: ${result.length}`);
    }
    return passed;
  }
  
  // Original solution function for reference
  function solution(message, K) {

    // characters are less than 3 return empty string
    if (K < 3) {
      return "";
    }
    
    // If message length is less than or equal to K, return the message as is
    if (message.length <= K) {
      return message;
    }
    
    // If K is 3, return "..."
    if (K === 3) {
      return "...";
    }
    
    // get the words and its length
    const words = message.split(" ");
    
    // If the first word is longer than K - 4, return "..."
    if (words[0].length + 4 > K) {
      return "...";
    }
    
    
    // form the notification with the first word and the next K - 4 characters of the next word, if possible, else "..."
    let notification = words[0];

    // get the length of the first word
    let currentLength = words[0].length;
    
    // add the next K - 4 characters of the next word to the notification, if possible, else "..."
    for (let i = 1; i < words.length; i++) {
        
      if (currentLength + 1 + words[i].length <= K - 4) {
        notification += " " + words[i];
        currentLength += 1 + words[i].length;
      } else {
        return notification + " ...";
      }
    }
    
    return notification;
  }
  
  // Run the tests
  function runAllTests() {
    let passedTests = 0;
    let totalTests = 0;
    
    // Test group 1: Original examples from the problem statement
    console.log("Test Group 1: Problem Examples");
    passedTests += runTest(++totalTests, "And now here is my secret", 15, "And now ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "There is an animal with four legs", 15, "There is an ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "super dog", 4, "...") ? 1 : 0;
    passedTests += runTest(++totalTests, "how are you", 20, "how are you") ? 1 : 0;
    
    // Test group 2: Edge cases
    console.log("\nTest Group 2: Edge Cases");
    // Minimum K value tests
    passedTests += runTest(++totalTests, "hello world", 3, "...") ? 1 : 0;
    passedTests += runTest(++totalTests, "a", 3, "...") ? 1 : 0;
    passedTests += runTest(++totalTests, "a", 4, "a") ? 1 : 0;
    
    // Single word tests
    passedTests += runTest(++totalTests, "hello", 5, "hello") ? 1 : 0;
    passedTests += runTest(++totalTests, "hello", 4, "...") ? 1 : 0;
    passedTests += runTest(++totalTests, "hello", 9, "hello") ? 1 : 0;
    passedTests += runTest(++totalTests, "hello", 10, "hello") ? 1 : 0;
    
    // First word + ellipsis exactly fits K
    passedTests += runTest(++totalTests, "hello world", 9, "hello ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "a longer sentence", 6, "a ...") ? 1 : 0;
    
    // Test group 3: Exact fits
    console.log("\nTest Group 3: Exact Fits");
    // Full message exactly fits K
    passedTests += runTest(++totalTests, "hello world", 11, "hello world") ? 1 : 0;
    passedTests += runTest(++totalTests, "hello world", 12, "hello world") ? 1 : 0;
    
    // Notification with ellipsis exactly fits K
    passedTests += runTest(++totalTests, "hello world and universe", 15, "hello world ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "a b c d e f", 9, "a b c ...") ? 1 : 0;
    
    // Test group 4: Various message lengths
    console.log("\nTest Group 4: Various Message Lengths");
    passedTests += runTest(++totalTests, "a b c d e f g h i j k l m n o p", 10, "a b c ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "short", 20, "short") ? 1 : 0;
    passedTests += runTest(++totalTests, "this is a medium length message", 30, "this is a medium length ...") ? 1 : 0;
    
    // Test group 5: Long words
    console.log("\nTest Group 5: Long Words");
    passedTests += runTest(++totalTests, "supercalifragilisticexpialidocious is a long word", 15, "...") ? 1 : 0;
    passedTests += runTest(++totalTests, "small supercalifragilisticexpialidocious", 10, "small ...") ? 1 : 0;
    
    // Test group 6: Various K values
    console.log("\nTest Group 6: Various K Values");
    const testMessage = "this is a test message for various K values";
    for (let k = 3; k <= 45; k++) {
      let expected;
      if (k === 3) {
        expected = "...";
      } else if (k >= testMessage.length) {
        expected = testMessage;
      } else {
        // Manually calculate expected result
        const words = testMessage.split(" ");
        let result = "";
        let length = 0;
        
        for (let i = 0; i < words.length; i++) {
          const wordWithSpace = i === 0 ? words[i] : " " + words[i];
          if (length + wordWithSpace.length + 4 <= k) { // +4 for potential " ..."
            result += wordWithSpace;
            length += wordWithSpace.length;
          } else {
            break;
          }
        }
        
        expected = result + (result.length < testMessage.length ? " ..." : "");
      }
      
      passedTests += runTest(++totalTests, testMessage, k, expected) ? 1 : 0;
    }
    
    // Test group 7: Special character messages (while staying within problem constraints)
    console.log("\nTest Group 7: Messages with Mixed Case");
    passedTests += runTest(++totalTests, "THIS IS ALL CAPS", 10, "THIS ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "MiXeD CaSe TeXt", 12, "MiXeD CaSe ...") ? 1 : 0;
    
    // Test group 8: Boundary cases between words
    console.log("\nTest Group 8: Boundary Cases Between Words");
    passedTests += runTest(++totalTests, "exactly fits no ellipsis", 24, "exactly fits no ellipsis") ? 1 : 0;
    passedTests += runTest(++totalTests, "exactly fits no ellipsis", 23, "exactly fits no ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "one two three four", 13, "one two ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "one two three four", 14, "one two ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "one two three four", 15, "one two three ...") ? 1 : 0;
    
    // Test group 9: Additional real-world examples
    console.log("\nTest Group 9: Real-world Examples");
    passedTests += runTest(++totalTests, "New message from John", 12, "New ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "You have 3 unread messages", 15, "You have 3 ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "Meeting starts in 5 minutes", 20, "Meeting starts ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "Battery low please charge your device", 25, "Battery low please ...") ? 1 : 0;
    
    // Test group 10: Multiple spaces (problem says this won't happen, but testing for robustness)
    console.log("\nTest Group 10: Handling of Spaces (For Robustness)");
    passedTests += runTest(++totalTests, "one two", 7, "one ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "one two", 8, "one two") ? 1 : 0;
    
    // Test group 11: Large K values
    console.log("\nTest Group 11: Large K Values");
    const longMessage = "This is a very long message that should test the behavior of the solution function with a large K value";
    passedTests += runTest(++totalTests, longMessage, 100, longMessage) ? 1 : 0;
    passedTests += runTest(++totalTests, longMessage, 90, "This is a very long message that should test the behavior of the solution function ...") ? 1 : 0;
    
    // Test group 12: K value exactly matching ellipsis + first word
    console.log("\nTest Group 12: K Matching Ellipsis + First Word");
    passedTests += runTest(++totalTests, "first second", 10, "first ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "a bc def", 6, "a ...") ? 1 : 0;
    passedTests += runTest(++totalTests, "word another", 9, "word ...") ? 1 : 0;
    
    // Test group 13: Random length messages and K values
    console.log("\nTest Group 13: Random Examples");
    const words = ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "hello", "world", 
                   "computer", "programming", "notification", "test", "message", "mobile", "device", 
                   "character", "limit", "truncate", "display", "string", "algorithm"];
    
    for (let i = 0; i < 20; i++) {
      // Generate random message
      const numWords = 3 + Math.floor(Math.random() * 10); // 3-12 words
      let randomMessage = "";
      
      for (let j = 0; j < numWords; j++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        randomMessage += (j > 0 ? " " : "") + randomWord;
      }
      
      // Generate random K between 3 and message length + 10
      const randomK = 3 + Math.floor(Math.random() * (randomMessage.length + 10));
      
      // Manually calculate expected result
      let expected;
      if (randomK === 3) {
        expected = "...";
      } else if (randomK >= randomMessage.length) {
        expected = randomMessage;
      } else {
        // Calculate expected output
        const messageWords = randomMessage.split(" ");
        let result = "";
        let length = 0;
        
        for (let j = 0; j < messageWords.length; j++) {
          const wordWithSpace = j === 0 ? messageWords[j] : " " + messageWords[j];
          if (length + wordWithSpace.length + 4 <= randomK) { // +4 for potential " ..."
            result += wordWithSpace;
            length += wordWithSpace.length;
          } else {
            break;
          }
        }
        
        expected = result + (result.length < randomMessage.length ? " ..." : "");
      }
      
      passedTests += runTest(++totalTests, randomMessage, randomK, expected) ? 1 : 0;
    }
    
    // Summary
    console.log(`\nTests passed: ${passedTests}/${totalTests} (${(passedTests/totalTests*100).toFixed(2)}%)`);
  }
  
  // Run all tests
  runAllTests();