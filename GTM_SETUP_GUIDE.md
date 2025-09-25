# Google Tag Manager Setup Guide

## 🎯 **Quick Setup Steps**

### 1. Create GTM Container
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container for `rohitmacherla.com`
3. Get your GTM container ID (format: `GTM-XXXXXXX`)

### 2. Update Configuration
Replace `GTM-XXXXXXX` in `gatsby-config.ts` with your actual GTM container ID:

```typescript
id: "GTM-YOUR-ACTUAL-ID-HERE", // Replace with your GTM container ID
```

### 3. Configure Google Analytics 4 in GTM

#### A. Create GA4 Configuration Tag
1. **Tags** → **New** → **Google Analytics: GA4 Configuration**
2. **Measurement ID**: `G-1GFVN7ZGG6` (your existing GA4 property)
3. **Trigger**: All Pages
4. **Tag Name**: "GA4 - Configuration"

#### B. Create Enhanced Event Tags (Optional)
1. **Timeline Interactions Tag**:
   - **Tag Type**: Google Analytics: GA4 Event
   - **Event Name**: `timeline_interaction`
   - **Trigger**: Custom Event = `timeline_interaction`

2. **External Link Clicks Tag**:
   - **Tag Type**: Google Analytics: GA4 Event  
   - **Event Name**: `external_link_click`
   - **Trigger**: Custom Event = `external_link_click`

3. **Accessibility Tracking Tag**:
   - **Tag Type**: Google Analytics: GA4 Event
   - **Event Name**: `accessibility_interaction` 
   - **Trigger**: Custom Event = `accessibility_interaction`

### 4. Create Data Layer Variables
1. **Variables** → **New** → **Data Layer Variable**
2. Create these variables:
   - `DLV - Timeline Item` → Data Layer Variable Name: `timeline_item`
   - `DLV - Link Name` → Data Layer Variable Name: `link_name`
   - `DLV - Component Type` → Data Layer Variable Name: `component_type`
   - `DLV - Page Type` → Data Layer Variable Name: `page_type`

### 5. Publish Container
1. **Submit** your changes
2. **Publish** the container
3. Test with GTM Preview mode

---

## 🔧 **Enhanced Tracking Features**

### What's Now Tracked:
- ✅ **Page Views**: Enhanced with page type classification
- ✅ **Timeline Interactions**: When users interact with your career timeline
- ✅ **External Link Clicks**: GitHub, LinkedIn, StackExchange, Salesforce links
- ✅ **Accessibility Usage**: Skip links, keyboard navigation
- ✅ **Blog Post Engagement**: Post views and interactions
- ✅ **Component Interactions**: All custom component usage

### Data Layer Events:
```javascript
// Timeline interaction example
dataLayer.push({
  event: 'timeline_interaction',
  timeline_item: 'Started using Node.js & Heroku',
  timeline_action: 'focus',
  component_type: 'timeline'
});

// External link click example  
dataLayer.push({
  event: 'external_link_click',
  link_name: 'GitHub',
  link_url: 'https://github.com/markgarg',
  component_type: 'external_link'
});
```

---

## 🚀 **Advanced Features**

### 1. Custom Dimensions in GA4
Set up these custom dimensions in GA4 for richer reporting:
- `timeline_item` → Scope: Event
- `component_type` → Scope: Event  
- `page_type` → Scope: Event
- `accessibility_feature` → Scope: Event

### 2. Enhanced Measurement
Our setup enables:
- Scroll tracking
- Outbound click tracking  
- File download tracking
- Enhanced page view measurement

### 3. Accessibility Insights
Track how users interact with accessibility features:
- Skip link usage
- Keyboard navigation patterns
- Screen reader compatibility events

---

## 🧪 **Testing Your Setup**

### 1. GTM Preview Mode
1. In GTM, click **Preview**
2. Enter `localhost:8000` (your dev site)
3. Navigate your site and verify events fire

### 2. Browser Developer Tools
```javascript
// Check data layer in console
console.log(window.dataLayer);

// Manually trigger test event
window.dataLayer.push({
  event: 'test_event',
  test_data: 'GTM is working!'
});
```

### 3. GA4 Real-time Reports
1. Go to GA4 → **Reports** → **Realtime**
2. Navigate your site
3. Verify events appear in real-time

---

## 📊 **Migration Benefits**

### Before (Direct GA4):
- ❌ Basic page view tracking only
- ❌ No custom event tracking
- ❌ Limited accessibility insights
- ❌ Hard to add new tracking tools

### After (GTM + Enhanced Tracking):
- ✅ Rich component interaction tracking
- ✅ Accessibility usage insights  
- ✅ Timeline engagement metrics
- ✅ External link performance
- ✅ Easy to add Facebook Pixel, etc.
- ✅ Advanced debugging capabilities
- ✅ No code changes for new tracking

---

## 🆘 **Troubleshooting**

### GTM Not Loading?
1. Check container ID in `gatsby-config.ts`
2. Verify GTM container is published
3. Check browser console for errors

### Events Not Firing?
1. Enable GTM Preview mode
2. Check data layer in browser console
3. Verify trigger configuration in GTM

### GA4 Data Missing?
1. Confirm Measurement ID is correct
2. Check GA4 tag configuration in GTM
3. Wait up to 24 hours for data processing

---

**Your enhanced portfolio tracking is ready! 🎉**
