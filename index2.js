function solution(A) {
    const N = A.length;
    
    // First, let's check if it's even possible to have 10 bricks in each box
    const totalBricks = A.reduce((sum, bricks) => sum + bricks, 0);
    if (totalBricks !== 10 * N) {
      return -1; // Impossible if total bricks is not N*10
    }
    
    // We'll use a greedy approach moving from left to right
    // At each step, we balance the current box to 10 by moving bricks to/from the next box
    let moves = 0;
    let currentBalance = 0; // Excess or deficit carried to the next box
    
    for (let i = 0; i < N - 1; i++) {
      // Current box starts with A[i] bricks plus any excess/deficit from previous box
      const currentBricks = A[i] + currentBalance;
      
      // Calculate how many bricks need to be moved to make this box have exactly 10
      const neededMoves = Math.abs(currentBricks - 10);
      moves += neededMoves;
      
      // Update the balance for the next box
      // If currentBricks > 10, we push excess to the next box (positive balance)
      // If currentBricks < 10, we borrow from the next box (negative balance)
      currentBalance = currentBricks - 10;
    }
    
    // Check if the last box ends up with exactly 10 bricks
    // This is guaranteed by our initial check, but adding this for clarity
    if (A[N-1] + currentBalance !== 10) {
      return -1; // This should never happen if our initial check passed
    }
    
    return moves;
  }


//   time Complexity = 0(N) - iterating through the array 
//  space Complexity = 0(1) - using constant amount of extra space