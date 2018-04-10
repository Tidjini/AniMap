"# AniMap"
init project run it on android devices, then install react-native-maps and link it to the projects:

some issue with react-native-maps:
1/ the gradle ComplieOnly() and Implementation Methods : Fix with changing # node_modules/react-native-maps/lib/android/build.gradle
From :
compileOnly "com.facebook.react:react-native:+"
implementation "com.google.android.gms:play-services-base:$googlePlayServicesVersion"
implementation "com.google.android.gms:play-services-maps:$googlePlayServicesVersion"
implementation "com.google.maps.android:android-maps-utils:$androidMapsUtilsVersion"
TO :
provided "com.facebook.react:react-native:+"
compile "com.google.android.gms:play-services-base:$googlePlayServicesVersion"
compile "com.google.android.gms:play-services-maps:$googlePlayServicesVersion"
compile "com.google.maps.android:android-maps-utils:$androidMapsUtilsVersion"
      ref :https://github.com/react-community/react-native-maps/issues/2152


2/Execution failed for task ':react-native-maps:mergeReleaseResources'.
casued by Windows, keep below 240 characters for folder Paths
In the root build.gradle file:

      allprojects {
          buildDir = "C:/tmp/${rootProject.name}/${project.name}"
          repositories {
             ...
          }
      }
      ref : https://github.com/react-community/react-native-maps/issues/588
