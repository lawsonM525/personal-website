import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple file-based storage for the visitor count
const counterFilePath = path.join(process.cwd(), 'data', 'page-views.json');

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize counter file if it doesn't exist
if (!fs.existsSync(counterFilePath)) {
  fs.writeFileSync(counterFilePath, JSON.stringify({ 
    resources: 0,
    // Add other pages here if you want to track them too
  }), 'utf8');
}

// Get page views
export async function GET(request: Request) {
  try {
    // Get the page parameter from the URL
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'resources';
    
    // Read the current counts
    const data = JSON.parse(fs.readFileSync(counterFilePath, 'utf8'));
    
    return NextResponse.json({ count: data[page] || 0 });
  } catch (error) {
    console.error('Error getting page views:', error);
    return NextResponse.json({ error: 'Failed to get page views' }, { status: 500 });
  }
}

// Increment page views
export async function POST(request: Request) {
  try {
    // Get the page parameter from the URL
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'resources';
    
    // Read the current counts
    let data = {};
    if (fs.existsSync(counterFilePath)) {
      data = JSON.parse(fs.readFileSync(counterFilePath, 'utf8'));
    }
    
    // Increment count for the specified page
    if (!data[page]) {
      data[page] = 0;
    }
    data[page]++;
    
    // Save the updated counts
    fs.writeFileSync(counterFilePath, JSON.stringify(data), 'utf8');
    
    return NextResponse.json({ count: data[page] });
  } catch (error) {
    console.error('Error incrementing page views:', error);
    return NextResponse.json({ error: 'Failed to increment page views' }, { status: 500 });
  }
}
